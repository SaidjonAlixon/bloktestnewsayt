# TestBlok.uz - Onlayn Test Platformasi

100 ming foydalanuvchi uchun mo'ljallangan professional test platformasi.

## Xususiyatlar

- 🔐 Xavfsiz autentifikatsiya tizimi
- 📝 Interaktiv test interfeysi
- 📊 Batafsil analytics va hisobotlar
- 💳 To'lov tizimi integratsiyasi
- 👨‍💼 Admin panel
- 📱 Responsive dizayn
- 🚀 Yuqori performance

## Texnologiyalar

### Frontend
- React 18 + TypeScript
- Tailwind CSS
- Lucide React icons
- Vite build tool

### Backend
- Node.js + Express
- PostgreSQL database
- Redis cache
- JWT authentication
- Knex.js ORM

### DevOps
- Docker & Docker Compose
- Nginx load balancer
- PM2 process manager
- Automated backups

## Tizim Talablari

### Development
- Node.js 18+
- PostgreSQL 15+
- Redis 7+
- 8GB RAM minimum

### Production (100k users)
- 3-5 application servers (4 CPU, 8GB RAM each)
- PostgreSQL cluster (16 CPU, 32GB RAM)
- Redis cluster (8 CPU, 16GB RAM)
- Load balancer
- CDN

## O'rnatish

### 1. Repository clone qilish
```bash
git clone https://github.com/your-username/testblok-uz.git
cd testblok-uz
```

### 2. Environment variables
```bash
# Backend
cp backend/.env.example backend/.env
# Edit backend/.env with your configuration

# Frontend
cp .env.example .env
# Edit .env with your configuration
```

### 3. Docker bilan ishga tushirish
```bash
# Development
docker-compose up -d

# Production
docker-compose -f docker-compose.prod.yml up -d
```

### 4. Database migration
```bash
cd backend
npm run migrate
npm run seed
```

## Development

### Frontend
```bash
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm run dev
```

## Production Deployment

### 1. Server tayyorlash
```bash
# Ubuntu 22.04 LTS
sudo apt update
sudo apt install docker.io docker-compose nginx certbot
```

### 2. SSL sertifikat
```bash
sudo certbot --nginx -d testblok.uz -d www.testblok.uz
```

### 3. Deploy
```bash
git clone https://github.com/your-username/testblok-uz.git
cd testblok-uz
docker-compose -f docker-compose.prod.yml up -d
```

## Monitoring

### Health Check
```bash
curl http://localhost:3001/health
```

### Logs
```bash
# Application logs
docker-compose logs -f backend

# Database logs
docker-compose logs -f postgres

# Nginx logs
docker-compose logs -f nginx
```

### Performance Monitoring
- New Relic: Application performance
- DataDog: Infrastructure monitoring
- Sentry: Error tracking
- Pingdom: Uptime monitoring

## Backup Strategy

### Automated Backups
```bash
# Database backup (daily)
pg_dump testblok_prod > backup_$(date +%Y%m%d).sql

# File backup (daily)
tar -czf uploads_backup_$(date +%Y%m%d).tar.gz uploads/

# Upload to S3/Cloud Storage
aws s3 cp backup_$(date +%Y%m%d).sql s3://testblok-backups/
```

### Restore
```bash
# Database restore
psql testblok_prod < backup_20241201.sql

# Files restore
tar -xzf uploads_backup_20241201.tar.gz
```

## Security

### Best Practices
- ✅ HTTPS only
- ✅ JWT token authentication
- ✅ Rate limiting
- ✅ Input validation
- ✅ SQL injection protection
- ✅ XSS protection
- ✅ CSRF protection
- ✅ Helmet.js security headers

### Security Checklist
- [ ] Regular security audits
- [ ] Dependency updates
- [ ] Penetration testing
- [ ] Access logs monitoring
- [ ] Incident response plan

## Performance Optimization

### Frontend
- Code splitting
- Lazy loading
- Image optimization
- Service Worker caching
- Bundle size optimization

### Backend
- Database indexing
- Query optimization
- Redis caching
- Connection pooling
- Response compression

### Infrastructure
- CDN for static assets
- Load balancing
- Auto-scaling
- Database read replicas
- Caching layers

## API Documentation

### Authentication
```bash
POST /api/auth/login
POST /api/auth/register
GET /api/auth/verify
```

### Users
```bash
GET /api/users
GET /api/users/:id
PUT /api/users/:id
PATCH /api/users/:id/block
```

### Tests
```bash
POST /api/tests/start
GET /api/tests/session/:id
POST /api/tests/session/:id/answer
POST /api/tests/session/:id/complete
```

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📧 Email: support@testblok.uz
- 📱 Telegram: @testblok_support
- 🌐 Website: https://testblok.uz

## Roadmap

### Q1 2025
- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] AI-powered question generation
- [ ] Multi-language support

### Q2 2025
- [ ] Video questions support
- [ ] Live proctoring
- [ ] Advanced reporting
- [ ] API for third-party integrations

### Q3 2025
- [ ] Machine learning recommendations
- [ ] Adaptive testing
- [ ] Blockchain certificates
- [ ] VR/AR support