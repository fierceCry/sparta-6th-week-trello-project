import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { CardEntity } from "./card.entity";
import { BoardEntity } from "./board.entity";
import { IsNotEmpty, IsString } from "class-validator";

@Entity("list")
export class ListEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", name: "board_id" })
  boardId: number;

  @Column({ type: "varchar", name: "user_id" })
  userId: string;

  @IsNotEmpty({ message: "타이틀을 작성해 주세요." })
  @IsString()
  @Column({ type: "varchar", length: 200 })
  title: string;

  @Column({ type: "int", unique: true, name: "next_index" })
  nextIndex: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(() => BoardEntity, (board) => board.list)
  @JoinColumn({ name: "board_id" })
  board: BoardEntity;

  @OneToMany(() => CardEntity, (card) => card.list)
  card: CardEntity[];
}
