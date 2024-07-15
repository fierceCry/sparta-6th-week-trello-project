import { BadRequestException, Injectable } from "@nestjs/common";

import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CardCommentsEntity } from "src/entities/card-comments.entity";
import { CardsEntity } from "src/entities/cards.entity";
import { MESSAGES } from "src/common/constants/messages.constant";

@Injectable()
export class CardCommentService {
  constructor(
    @InjectRepository(CardsEntity)
    private readonly cardRepository: Repository<CardsEntity>,
    @InjectRepository(CardCommentsEntity)
    private readonly cardCommentRepository: Repository<CardCommentsEntity>,
  ) {}

  async findCommentById(commentId: number){
    const comment = await this.cardCommentRepository.findOne({
      where: { id: commentId },
    });

    if (!comment) {
      throw new BadRequestException('해당 댓글을 찾을 수 없습니다.');
    }

    return comment;
  }

  async commentCreate(cardId: number, content: string, userId: number) {
    const card = await this.cardRepository.findOne({ where: { id: cardId } });
    if (!card) {
      throw new BadRequestException(MESSAGES.CARD.NOT_CARD.CARD_NOT_FOUND);
    }

    const comment = await this.cardCommentRepository.save({
      cardId: cardId,
      userId: userId,
      content: content,
    });

    return comment;
  }

  async commentPatch(commentId: number, userId: number, content: string) {
    await this.findCommentById(commentId)
    const result = await this.cardCommentRepository.update(
      { id: commentId, userId: userId },
      { content: content }
    );
  
    if (result.affected === 0) {
      throw new BadRequestException('댓글을 수정할 권한이 없습니다.');
    }
  }
  
  async commentDelete(userId: number, commentId: number) {
    const comment = await this.findCommentById(commentId);

    if (comment.userId !== userId) {
      throw new BadRequestException('댓글을 삭제할 권한이 없습니다.');
    }

    await this.cardCommentRepository.delete(comment.id);
  }
}