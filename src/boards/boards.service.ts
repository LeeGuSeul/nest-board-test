import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import { v1 as uuid } from 'uuid';

@Injectable() // 어플리케이션 전체에 사용 될 수 있다.
export class BoardsService {
    private boards: Board[] = [];

    getAllBoards(): Board[] { 
        return this.boards;
    }

    createBoard(CreateBoardDto) { 
        const { title, description } = CreateBoardDto;

        const board: Board = {
            id:uuid(),
            title,
            description,
            status:BoardStatus.PUBLIC
        }
        this.boards.push(board);
        return board;
    }

    getBoardById(id: string): Board { 
        const found = this.boards.find((board) => board.id === id);
        
        if (!found) { 
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
        return found
    }

    deleteBoard(id: string): void {

        // 없는 게시물 지우려고 할 때
        const found = this.getBoardById(id);
        this.boards = this.boards.filter((board) => board.id !== found.id);
    }

    updateBoardStatus(id:string, status:BoardStatus) { 
        const board = this.getBoardById(id);
        board.status = status;
        return board;
    }
}
