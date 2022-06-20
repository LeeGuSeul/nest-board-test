import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { throws } from 'assert';
import { Board, BoardStatus } from './boards.model';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards') // /boards
  export class BoardsController {
  constructor(private boardsService: BoardsService) { }; // Dependency Injection

  @Get('/') // /boards 안의 root
  getAllBoard(): Board[] {
    return this.boardsService.getAllBoards();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() CreateBoardDto : CreateBoardDto
  ): Board { 
    // @Body() body :: request에서 보내온 값을 가져 올 수 있다.
    // 특정 값(title)만 가져오고 싶은 경우는 @Body('title') title
    return this.boardsService.createBoard(CreateBoardDto)
  }

  @Get('/:id')
  getBoardById(@Param('id') id:string) : Board { 
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id: string): void { 
    this.boardsService.deleteBoard(id);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id') id: string,
    @Body('status') status:BoardStatus
  ) { 
      return this.boardsService.updateBoardStatus(id, status)
  }
  

}
