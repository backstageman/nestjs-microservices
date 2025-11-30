import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

/* 
    后续待办：把health check的逻辑抽离到一个service中
    这样可以更好地组织代码，并且使得health check的逻辑更易于测试和维护
*/

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly db: TypeOrmHealthIndicator,
  ) {}

  @HealthCheck()
  @Get()
  isHealthy() {
    console.log('Health check requested 11221');
    return this.health.check([() => this.db.pingCheck('database')]);
  }
}
