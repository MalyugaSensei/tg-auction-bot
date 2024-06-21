import { Model, Document, Schema, Types } from 'mongoose';

interface Sticker {
    title: string;
}

export interface AuctionDocument extends Document {
    auctionId: number;
    lotName: string;
    lotFloat: Types.Decimal128;
    lotWear: string;
    stickers: Sticker[];
    lotStartPrice: number;
    status: 'active' | 'pending' | 'ended';
    startAt: Date;
    finishedAt?: Date;
    bidId?: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export const Auction: Model<AuctionDocument>;