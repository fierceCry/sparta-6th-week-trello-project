import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Redis from "ioredis";

@Injectable()
export class RedisConfig {
  private redisClient: Redis;

  constructor(
    private configService: ConfigService
  ) {
    this.redisClient = new Redis({
      host: this.configService.get<string>("REDIS_HOST"),
      port: this.configService.get<number>("REDIS_PORT"),
      password: this.configService.get<string>("REDIS_PASSWORD"),
    });
    this.initialize();
  }

  private async initialize() {
    try {
      await this.redisClient.ping();
      console.log("Redis connected successfully");
    } catch (error) {
      console.error("Redis connection error:", error);
    }
  }

  getClient(): Redis {
    return this.redisClient;
  }
}
