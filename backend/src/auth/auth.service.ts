import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { OrganizationsService } from '../organizations/organizations.service';
import { UserRole } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private orgService: OrganizationsService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: any) {
    const existing = await this.usersService.findByEmail(registerDto.userData.email);
    if (existing) {
      throw new ConflictException('อีเมลนี้ถูกใช้งานแล้ว');
    }

    // 1. Create Organization
    const org = await this.orgService.create({
      name: registerDto.orgData.name,
      tax_id: registerDto.orgData.tax_id,
      industry_type: registerDto.orgData.industry_type,
    });

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(registerDto.userData.password, 10);

    // 3. Create User
    const user = await this.usersService.create({
      ...registerDto.userData,
      password_hash: hashedPassword,
      role: registerDto.userData.role || UserRole.USER,
      organization: org,
    });

    // 4. Generate JWT
    const payload = { sub: user.id, email: user.email, orgId: org.id, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: { id: user.id, email: user.email, username: user.username, role: user.role },
      organization: org,
    };
  }

  async login(loginDto: any) {
    const user = await this.usersService.findByEmailOrUsername(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
    }

    const isMatch = await bcrypt.compare(loginDto.password, user.password_hash);
    if (!isMatch) {
      throw new UnauthorizedException('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
    }

    const payload = { sub: user.id, email: user.email, orgId: user.organization?.id, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: { id: user.id, email: user.email, username: user.username, role: user.role },
      organization: user.organization,
    };
  }

  async registerAssessor(registerDto: any) {
    const existing = await this.usersService.findByEmail(registerDto.userData.email);
    if (existing) {
      throw new ConflictException('อีเมลนี้ถูกใช้งานแล้ว');
    }

    // 1. Hash password
    const hashedPassword = await bcrypt.hash(registerDto.userData.password, 10);

    // 2. Create User as ASSESSOR
    const user = await this.usersService.create({
      ...registerDto.userData,
      password_hash: hashedPassword,
      role: UserRole.ASSESSOR,
    });

    // 3. Create Assessor Profile
    const profile = await this.usersService.createAssessorProfile(user.id, registerDto.profileData);

    // 4. Generate JWT
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: { id: user.id, email: user.email, username: user.username, role: user.role },
      profile,
    };
  }
}
