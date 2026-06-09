# Nimbus Funnel Backend

Backend serverless para el funnel de cobertura móvil de Nimbus Telecom.

## Arquitectura

- `backend/api`: API Express preparada para Lambda con `serverless-http`.
- `backend/infra`: infraestructura AWS CDK v2.
- AWS Lambda recibe las peticiones HTTP.
- API Gateway HTTP API expone los endpoints públicos.
- DynamoDB guarda los leads, estudios de cobertura e intenciones de contacto.
- Amazon SES envía notificaciones internas cuando llega un lead o estudio.

No usa base de datos relacional, autenticación, colas, Cognito, Middy ni NestJS.

## Endpoints

### `GET /health`

Devuelve:

```json
{
  "ok": true,
  "data": {
    "status": "ok",
    "service": "nimbus-funnel-api"
  }
}
```

### `POST /leads`

Campos:

- `name`
- `phone`
- `email`
- `preferredContactMethod`: `phone`, `whatsapp`, `email`
- `message`
- `source`
- `language`: `es`, `ca`, `en`
- `pageUrl`
- `consentAccepted`
- `recaptchaToken`

Reglas:

- `phone` o `email` deben estar presentes.
- `consentAccepted` debe ser `true`.
- `source`, `pageUrl` y `recaptchaToken` son opcionales.

### `POST /coverage-study`

Campos:

- `name`
- `phone`
- `email`
- `address`
- `postalCode`
- `city`
- `province`
- `preferredContactMethod`: `phone`, `whatsapp`, `email`
- `currentProblem`
- `currentOperator`
- `serviceType`: `mobile`, `fiber`, `internet`, `business`, `unknown`
- `language`: `es`, `ca`, `en`
- `pageUrl`
- `consentAccepted`
- `recaptchaToken`

Reglas:

- `phone` o `email` deben estar presentes.
- `address` o `postalCode` deben estar presentes.
- `consentAccepted` debe ser `true`.

### `POST /contact-intent`

Campos:

- `type`: `whatsapp_click`, `phone_click`, `email_click`, `chat_ai_click`, `coverage_cta_click`, `plan_request_click`, `other`
- `label`
- `pageUrl`
- `language`: `es`, `ca`, `en`
- `metadata`

## Respuestas

Éxito:

```json
{
  "ok": true,
  "data": {}
}
```

Error:

```json
{
  "ok": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "..."
  }
}
```

## DynamoDB

Tabla: `NimbusFunnelTable` por stage.

Modelo single-table:

- `PK`: `LEAD#<id>`, `COVERAGE_STUDY#<id>`, `CONTACT_INTENT#<id>`
- `SK`: `METADATA`
- `entityType`
- `id`
- `createdAt`
- `updatedAt`
- `status`: `new`
- `language`
- `pageUrl`
- `payload`
- `requestIp`
- `userAgent`

Índices:

- `entityType-createdAt-index`
- `status-createdAt-index`

## Variables De Entorno

API:

```bash
STAGE=dev
TABLE_NAME=
FRONTEND_ALLOWED_ORIGINS=http://localhost:3000,https://example.com
RECAPTCHA_ENABLED=false
RECAPTCHA_SECRET=
EMAIL_NOTIFICATIONS_ENABLED=true
SES_REGION=eu-west-1
SES_FROM_EMAIL="Nimbus Telecom <info@nimbustelecom.es>"
LEADS_NOTIFICATION_TO=
```

Frontend:

```bash
NEXT_PUBLIC_API_BASE_URL=
```

## Amazon SES

Configurar:

- `SES_REGION`: región donde está configurado SES. Si se omite, usa la región del Lambda.
- `SES_FROM_EMAIL`: remitente verificado en SES.
- `LEADS_NOTIFICATION_TO`: buzón interno que recibirá avisos

El Lambda recibe permisos IAM para `ses:SendEmail`.
Antes de producción, confirma que `SES_FROM_EMAIL` esté verificado en SES y que la cuenta tenga permisos de envío fuera del sandbox si vas a escribir a destinatarios no verificados.

Si falta configuración SES, la API guarda el lead y omite el email con un warning en logs.
Si el email falla, el lead no se pierde: queda guardado en DynamoDB y la API responde éxito.

## reCAPTCHA

La verificación queda preparada, pero se puede desactivar:

```bash
RECAPTCHA_ENABLED=false
```

Para activarla:

```bash
RECAPTCHA_ENABLED=true
RECAPTCHA_SECRET=<secret>
```

Cuando esté activa, los formularios deben enviar `recaptchaToken`.

## CORS

Configurar orígenes permitidos separados por comas:

```bash
FRONTEND_ALLOWED_ORIGINS=https://dominio-final.com,https://preview.example.com
```

Si no se configura ningún origen, la API permite peticiones sin restringir origen desde Express. En producción conviene fijarlo.

## Instalación

```bash
cd backend/api
npm install
npm run test
npm run build

cd ../infra
npm install
npm run build
npm run synth
```

## Desarrollo Local

```bash
cd backend/api
npm run dev
```

API local:

```text
http://localhost:4000
```

## Despliegue CDK

Bootstrap inicial si la cuenta no está preparada:

```bash
cd backend/infra
npx cdk bootstrap
```

Deploy dev:

```bash
cd backend/infra
STAGE=dev \
FRONTEND_ALLOWED_ORIGINS=https://tu-frontend.com \
SES_REGION=eu-west-1 \
SES_FROM_EMAIL="Nimbus Telecom <info@nimbustelecom.es>" \
LEADS_NOTIFICATION_TO=... \
npm run deploy -- --context stage=dev
```

Deploy prod:

```bash
cd backend/infra
STAGE=prod npm run deploy -- --context stage=prod
```

## Secretos En Producción

El stack acepta variables de entorno para simplificar el primer despliegue.
Para producción se recomienda mover `RECAPTCHA_SECRET` y cualquier secreto futuro a AWS Secrets Manager o SSM Parameter Store y resolverlos desde CDK/Lambda.

## Conectar El Frontend

Configurar:

```bash
NEXT_PUBLIC_API_BASE_URL=https://api-id.execute-api.region.amazonaws.com
```

Después, los formularios del frontend pueden llamar a:

- `${NEXT_PUBLIC_API_BASE_URL}/leads`
- `${NEXT_PUBLIC_API_BASE_URL}/coverage-study`
- `${NEXT_PUBLIC_API_BASE_URL}/contact-intent`

En esta iteración no se modifica el frontend.

## Seguridad Y Abuso

Incluido:

- Validación Zod.
- Consentimiento obligatorio.
- CORS configurable.
- reCAPTCHA preparado y desactivable.
- Guardado antes del envío de email para no perder leads.

Recomendado para producción:

- Activar reCAPTCHA o Turnstile.
- Configurar AWS WAF si hay abuso.
- Ajustar throttling a nivel API Gateway/CloudFront.
- Mover secretos a Secrets Manager o SSM Parameter Store.
- Crear alarmas CloudWatch para errores 4xx/5xx y fallos de email.

## Siguientes Pasos Recomendados

- Conectar los formularios actuales del funnel a `NEXT_PUBLIC_API_BASE_URL`.
- Añadir trazabilidad comercial por UTM y evento en `metadata`.
- Definir buzón operativo de recepción de leads.
- Crear flujo externo de seguimiento comercial o email automation.
- Añadir dashboard interno o exportación controlada cuando el volumen lo justifique.
