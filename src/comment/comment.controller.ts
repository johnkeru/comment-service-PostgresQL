import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from '@prisma/client';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @MessagePattern('comments')
  async getComments({limit, cursor, productId}:{limit: number, cursor?: number, productId?: string}) {
    return await this.commentService.getComments(limit, cursor, productId);
  }

  @MessagePattern('commentAdd')
  async addComment(comment: Comment) {
    if(!comment.comment)return 
    return await this.commentService.addComment(comment);
  }
  @MessagePattern('commentRemove')
  async removeComment(id: number) {
    return await this.commentService.removeComment(id);
  }
  @EventPattern('commentImageChange')
  async changeImage(data:{img:string, email:string}){
    let {img, email} = data
    await this.commentService.changeImage(img, email);
  }
}
