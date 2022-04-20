import { Injectable } from '@nestjs/common';
import { Comment } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class CommentService {
    constructor(private readonly prisma: PrismaService){}

    async getComments(limit: number, cursor?: number, productId?: string){
        let comments: Comment[] = []
        const limit_plus_one = Math.min(10, limit) + 1
        if(cursor && productId){
            comments = await this.prisma.comment.findMany({
                where: {
                    id: {
                        gt: cursor
                    },
                    productId
                },
                orderBy: {
                    id: 'asc'
                },
                take: limit_plus_one
            })
        }
        else{
            comments = await this.prisma.comment.findMany({
                where: {productId},orderBy: {id: 'asc'},
                take: limit_plus_one
            })
        }
        return {
            hasMore: comments.length === limit_plus_one,
            comments: comments.slice(0, limit)
        }
    }

    async addComment(comment: Comment){
        return await this.prisma.comment.create({
            data: comment
        })
    }

    async removeComment(id: number){
        await this.prisma.comment.delete({
            where: {
                id
            }
        })
        return "deleted."
    }

    async changeImage(image:string, email: string){
        try{
            image = (image && image.includes('http://')) ? image.replace('http://', 'https://') : image
            await this.prisma.comment.updateMany({where: {email}, data: {image}})
        }catch{
            return 
        }   
    }
}
