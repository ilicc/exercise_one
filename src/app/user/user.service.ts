import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user/models/user';
import { Comment } from './user/models/comment';

export const HOST = 'http://localhost:3000';


@Injectable()
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

    /**
   * Update users profile 
   * @param user User
   */
  getUserProfile(): Promise<User> {
    return new Promise((res, rej) => {
      let url: string = `${HOST}/user`;
      this.http.get<User>(url).subscribe(
        (response: User) => {
          console.log({url: url, res: response});
          res(response)
        },
        (err) => {
          rej(err)
        }
      );
    })
  }

  /**
   * Update users profile 
   * @param user User
   */
  getCommentList(): Promise<Comment[]> {
    return new Promise((res, rej) => {
      let url: string = `${HOST}/comments`;
      this.http.get<Comment[]>(url).subscribe(
        (response: Comment[]) => {
          console.log({url: url, res: response});
          res(response)
        },
        (err) => {
          rej(err)
        }
      );
    })
  }

  /**
   * Update users profile 
   * @param user User
   */
  updateUserProfile(user: User): Promise<User> {
    return new Promise((res, rej) => {
      let url: string = `${HOST}/user`;
      this.http.patch(url, user).subscribe(
        (response: User) => {
          console.log({url: url, res: response});
          res(response)
        },
        (err) => {
          rej(err)
        }
      );
    })
  }

  /**
   * Create commnet 
   * @param comment Comment
   */
  sendComment(comment: Comment): Promise<Comment> {
    return new Promise((res, rej) => {
      let url: string = `${HOST}/comments`;
      this.http.post(url, comment).subscribe(
        (response: Comment) => {
          console.log({url: url, res: response});
          res(response)
        },
        (err) => {
          rej(err)
        }
      );
    })
  }


}
