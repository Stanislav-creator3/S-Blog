import { Body, Controller, Post, Req } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { Request } from 'express';
import { VerifyDto } from './dto/verify.dto';
import { UserAgent } from 'src/shared/decorators/user-agent.decorator';

@Controller('verification')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @Post()
  async verify(
    @Req() req: Request,
    @Body() verifyDto: VerifyDto,
    @UserAgent() userAgent,
  ) {
    return this.verificationService.verify(req, verifyDto, userAgent);
  }
}
