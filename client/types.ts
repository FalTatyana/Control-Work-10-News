export interface Post {
 title: string
 message: string
 img: string
 id: string
 datetime: string
}

export interface PostMessage {
 title: string,
 message: string
}

export interface Comment {
 author: string
 message: string
 id: string
 postId: string
}