import { ObjectId, Schema, model } from "mongoose";

export interface Post {
    content: string;
    image_url: string[];
    tag: number[];
    create_by: ObjectId;
    post_date: Date;
    like: ObjectId[];
    comment: ObjectId[];
}

export interface Comment {
    content: string;
    create_by: ObjectId;
    comment_date: Date;
}



const PostSchema = new Schema<Post>({
    content: String,
    image_url: [String],
    tag: [Number],
    create_by: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    post_date: Date,
    like: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    comment: [{
        type: Schema.Types.ObjectId,
        ref: "Comment",
    }],
});

const CommentSchema = new Schema<Comment>({
    content: String,
    create_by: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    comment_date: Date,
});

export const PostModel = model<Post>("Post", PostSchema);
export const CommentModel = model<Comment>("Comment", CommentSchema);
