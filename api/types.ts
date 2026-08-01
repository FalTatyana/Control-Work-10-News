export interface Post {
 title: string
 message: string
 img: string
 id: string
 datetime: string
}

export interface Comment {
 message: string
 commentId: string
 postId: string
 author: string
}