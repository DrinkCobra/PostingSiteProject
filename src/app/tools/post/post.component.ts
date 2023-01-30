import { Component, Input, OnInit } from '@angular/core';
import { PostData } from 'src/app/pages/post-feed/post-feed.component';
import { MatDialog } from '@angular/material/dialog';
import { ReplyComponent } from '../reply/reply.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{
  @Input() postData: PostData;
  constructor(private dialog: MatDialog){}
  ngOnInit(): void {
  }
  onReplyClick(){
    this.dialog.open(ReplyComponent, {data: this.postData.postId});
  }
}