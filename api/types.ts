export interface Post {
 title: string
 message: string
 id: string
 datetime: string
}

export interface PostComment {
 message: string
 postId: string
 author: string
 id: string
}