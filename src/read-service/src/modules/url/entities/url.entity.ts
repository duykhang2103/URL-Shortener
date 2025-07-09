import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'URL' })
export class UrlEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  original: string;

  @Column({ unique: true })
  shortCode: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ default: 0 })
  numOfClicks: number;

  @Column({ type: 'timestamp', nullable: true })
  lastClickedAt?: Date;

  @Column({ type: 'timestamp', nullable: true })
  expiresAt?: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
