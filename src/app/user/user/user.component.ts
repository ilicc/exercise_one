import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { User } from './models/user';
import { UserService } from '../user.service';
import { Comment } from './models/comment';
import { MatDialog } from '@angular/material';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

export enum KEY_CODE {
  ENTER = 13,
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @ViewChild('comment') comment: ElementRef;
  likes: number = 121; // likes number
  following: number = 321; // following number
  followers: number = 222; // followers number
  commentList: Comment[] = []; // List of comments
  baseCommentList: Comment[] = []; // List of comments
  commentText: string = 'Add a comment'; // Comment 
  hideOrShow: string = 'Hide'; // Text in comments show/hide description
  today: number = new Date().getTime(); // Current date
  user: User = {
    likes: 0,
    followers: 0,
    following: 0,
    avatar: "",
    name: "",
    address: ""
  }; // Actual user

  constructor(
    private $userService: UserService,
    public dialog: MatDialog,
  ) {
    this.getUser();
    this.loadComments();
   }

  ngOnInit() {
  }

  /**
   * Load all comments
   */
  loadComments(): void {
    this.$userService.getCommentList()
    .then((list: Comment[]) => {
      list.forEach((comment: Comment) => {
        comment.date = this.howManyDaysPassed(comment.date);
      })
      this.commentList = list;
      this.baseCommentList = this.commentList;
    })
    .catch(error => {
      console.error('Error durring downloading comments.')
    })
  }

  /**
   * Count how many days passed since comment was added
   * @param commentDate Comment date
   */
  howManyDaysPassed(commentDate: number): number {
    let d: number = Math.round((this.today - commentDate) / (1000 * 60 * 60 * 24));
    return d;
  }

  /**
   * Load user data
   */
  getUser(): void {
    this.$userService.getUserProfile()
    .then((user: User) => {
      this.user = user;
    })
    .catch(error => {
      console.error('Error durring downloading users data.')
    })
  }

  /**
   * Increase number of followers
   * @param followers Followers number
   */
  addFollower(user: User): void {
    user.followers+=1;
    this.$userService.updateUserProfile(user)
    .then((user: User) => {
      this.user = user;
    })
    .catch(error => {
      console.error('Error durring downloading users data: ', error)
    })
  }

  /**
   * Add likes 
   * @param user 
   */
  addLike(user: User): void {
    user.likes+=1;
    this.$userService.updateUserProfile(user)
    .then((user: User) => {
      this.user = user;
    })
    .catch(error => {
      console.error('Error durring downloading users data: ', error);
    })
  }

  /**
   * Add comments to datebase
   */
  addComment(text: string): void {
    let comment: Comment = {
      text: text,
      author: 'T.Hanks',
      date: new Date().getTime(),
      avatar: 'https://d-pt.ppstatic.pl/kadry/k/r/1/06/da/57ecbc646b4fc_o,size,640x400,q,71,h,3003c4.jpg'
    }
    this.$userService.sendComment(comment)
    .then((response: Comment) => {
      response.date = this.howManyDaysPassed(response.date);
      this.baseCommentList.push(response);
    })
    .catch(error => {
      console.error(error);
    })
  }

  /**
   * Listen for key events and adds comment if enter is clicked
   * @param event Key event
   */
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODE.ENTER && this.commentText !== 'Add a comment' && this.commentText !== "") {
      this.addComment(this.commentText);
      this.commentText = 'Add a comment';
      this.comment.nativeElement.blur();
    }
  }

  /**
   * Sets placeholder after we leave input without sending comment
   */
  setPlaceholder(): void {
    this.commentText = 'Add a comment';
  }

  /**
   * Clears input after we click on it
   */
  clearInput(): void {
    this.commentText = '';

  }

  /**
   * Hide all comments
   */
  hideComments(): void {
    if(this.commentList.length === 0){
      this.commentList = this.baseCommentList;
      this.hideOrShow = 'Hide';
    } else {
      this.commentList = [];
      this.hideOrShow = 'Show'; 
    }
  }

  /**
   * Open dialog with URL
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(UserDialogComponent);
  }

}
