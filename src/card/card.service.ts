import { Injectable } from "@nestjs/common";
import { CreateCardDto } from "./dto/CreateCardDto";
import { InjectRepository } from "@nestjs/typeorm";
import { CardEntity } from "src/entities/card.entity";
import { Repository } from "typeorm";

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(CardEntity) private readonly cardRepository: Repository<CardEntity>,
  ) {}

  // 카드 생성 API
  // id는 생성 되고 나서 발생하는 거니까 list id를 넣는다.
  async create({ listId }: CreateCardDto) {
    const newCard = await this.cardRepository.save({ listId });

    return newCard;
  }

  findOne(id: number) {
    return `This action returns a #${id} card`;
  }

  delete(id: number) {
    return `this action returns a #${id} card`;
  }
}
