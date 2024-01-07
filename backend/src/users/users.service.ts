import * as uuid from 'uuid'
import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { UserInfo } from './UserInfo';

@Injectable()
export class UsersService {

  constructor(private emailService: EmailService){}

  async createUser(name: string, email: string, password: string) {
    await this.checkUserExists(email)

    const signupVerifyToken = uuid.v1()

    await this.saveUser(name, email, password, signupVerifyToken)
    await this.sendMemeberJoinEmail(email,signupVerifyToken)
  }

  private async checkUserExists(email: string) {    
  }

  private saveUser( name: string, email: string, password: string, signupVerifyToken: string) {
    return
  }

  private async sendMemeberJoinEmail(email: string, signupVerifyToken: string) {
    await this.emailService.sendMemberJoinVerification(email, signupVerifyToken)
  }

  async verifyEmail(signupVeirifyToken: string): Promise<string> {
    // TODO
    //1. DB에서 signupVerifyToken으로 회원 가입 처리중인 유저가 있는지 조회하고 없다면 에러 처리
    //2. 바로 로그인 상태가 되도록 JT를 발급

    throw new Error('Method not implemented')
  }

  async login(email: string, password: string): Promise<string> {
    // TODO
    //1. email, password를 가진 유저가 존재하는지 DB에서 확인하고 없다면 에러 처리 
    //2. JNT를 발급

    throw new Error('Method not implemented.')
  }
  
  /**
   * 유저정보 반환
   * 
   * @param userId 유저 아이디
   */
  async getUserInfo(userId: string): Promise<UserInfo> {
    //TODO
    //1. userId를 가진 유저가 존재하는지 DB에서 확인하고 없다면 에러 처리
    //2. 조회된 데이터를 UserInfo 타입으로 응답
    throw new Error('method not implemented.')
  }
}
