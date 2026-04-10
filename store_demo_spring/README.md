# store_demo_spring

Spring Boot backend created to migrate from `store_demo_nest`.

## What is migrated now

- Project skeleton with Maven + Java 17.
- PostgreSQL + JPA configuration.
- JWT authentication (`/auth/login`, `/auth/register`, `/auth/protected`).
- `hanghoa` CRUD endpoints matching NestJS routes.
- `daily` CRUD + search endpoints matching NestJS routes.
- `nha-cung-cap` CRUD + find-by-ma endpoints matching NestJS routes.
- `phieu-xuat` flow with stock validation, detail table, and dai-ly relation.
- `phieu-xuat-hang-hoa` and `phieu-xuat-dai-ly` read endpoints.
- `phieu-nhap` CRUD basics with `phieu-nhap-hang-hoa` relation persistence.
- `phieu-nhap-hang-hoa` and `phieu-nhap-nha-cung-cap` read endpoints.
- `bill-xuat` create + total calculation endpoints.
- `bill-nhap` create + total calculation endpoints.
- Transaction boundaries for major write flows (`phieu-xuat`, `phieu-nhap`, `daily`).
- Unified error JSON format via global exception handler.
- Swagger UI at `/api`.

## Run locally

1. Ensure Java 17 and Maven are installed.
2. Create environment variables if needed:
   - `SPRING_DATASOURCE_URL`
   - `SPRING_DATASOURCE_USERNAME`
   - `SPRING_DATASOURCE_PASSWORD`
   - `JWT_SECRET` (at least 32 chars)
3. Start app:

```bash
mvn spring-boot:run
```

## Endpoint mapping (NestJS -> Spring)

- `POST /auth/login` -> same
- `POST /auth/register` -> same
- `POST /auth/protected` -> same
- `POST /hanghoa/create-hang-hoa` -> same
- `GET /hanghoa/get-du-lieu` -> same
- `GET /hanghoa/:id` -> same
- `PUT /hanghoa/update/:ma` -> same
- `DELETE /hanghoa/:id` -> same
- `GET /hanghoa/find/:ma` -> same
- `GET /hanghoa/find/:maDaiLy` in NestJS had route conflict; in Spring it is `GET /hanghoa/find-by-ma-dai-ly/{maDaiLy}`

## Next migration steps

1. Convert table relationships:
   - `@OneToMany`, `@ManyToOne`, `@ManyToMany` via join tables (`phieu-xuat-hang-hoa`, `phieu-nhap-hang-hoa`)
2. Move stock checking business logic from Nest services into Spring services.
3. Add integration tests for major flows (create phieu, xuat/nhap validation).
