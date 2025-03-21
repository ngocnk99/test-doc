import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import {
  CreatePromotionDto,
  UpdatePromotionDto,
  PromotionResponseDto,
  PromotionListResponseDto,
  PromotionQueryParamsDto,
  PromotionStatus,
  PromotionType,
} from './dto/promotion.dto';

@ApiTags('merchant/promotion')
@Controller('merchant/promotion')
export class PromotionController {
  @Get()
  @ApiOperation({ summary: 'Lấy danh sách khuyến mãi' })
  @ApiResponse({
    status: 200,
    description: 'Danh sách khuyến mãi được trả về thành công, apis/promotion/getAllPromotions',
    type: PromotionListResponseDto,
  })
  async getAllPromotions(
    @Query() queryParams: PromotionQueryParamsDto,
  ): Promise<PromotionListResponseDto> {
    // Chuyển đổi từ query params sang đối tượng PromotionQueryOptions
    const options = {
      name: queryParams.name,
      status: queryParams.status,
      garage_id: queryParams.garage_id,
      from_time: queryParams.from_time,
      to_time: queryParams.to_time,
      promotion_type: queryParams.promotion_type,
      pageSetting: {
        page: queryParams.page || 1,
        pageSize: queryParams.pageSize || 10,
      },
      sort_created_at: queryParams.sort_created_at,
    };
    //@ts-ignore
    return {};
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Lấy chi tiết một khuyến mãi theo ID,  apis/promotion/getPromotionDetail',
  })
  @ApiParam({ name: 'id', description: 'ID của khuyến mãi cần lấy' })
  @ApiResponse({
    status: 200,
    description: 'Chi tiết khuyến mãi được tìm thấy',
    type: PromotionResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Không tìm thấy khuyến mãi' })
  async getPromotionDetail(@Param('id') id: string): Promise<{ data: PromotionResponseDto }> {
    //@ts-ignore
    return {};
  }

  @Post()
  @ApiOperation({ summary: 'Tạo khuyến mãi mới' })
  @ApiResponse({
    status: 201,
    description: 'Khuyến mãi đã được tạo thành công, apis/promotion/createPromotion',
    type: PromotionResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Dữ liệu đầu vào không hợp lệ' })
  async createPromotion(
    @Body() createPromotionDto: CreatePromotionDto,
  ): Promise<{ data: PromotionResponseDto }> {
    //@ts-ignore
    return {};
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật một khuyến mãi theo ID' })
  @ApiParam({ name: 'id', description: 'ID của khuyến mãi cần cập nhật' })
  @ApiResponse({
    status: 200,
    description: 'Khuyến mãi đã được cập nhật thành công,  apis/promotion/updatePromotion',
    type: PromotionResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Không tìm thấy khuyến mãi' })
  @ApiResponse({ status: 400, description: 'Dữ liệu đầu vào không hợp lệ' })
  async updatePromotion(
    @Param('id') id: string,
    @Body() updatePromotionDto: UpdatePromotionDto,
  ): Promise<{ data: PromotionResponseDto }> {
    //@ts-ignore
    return {};
  }

  // @Delete(':id')
  // @ApiOperation({ summary: 'Xóa một khuyến mãi theo ID' })
  // @ApiParam({ name: 'id', description: 'ID của khuyến mãi cần xóa' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Khuyến mãi đã được xóa thành công',
  //   schema: {
  //     properties: {
  //       data: {
  //         properties: {
  //           success: { type: 'boolean', example: true },
  //           message: { type: 'string', example: 'Xóa khuyến mãi thành công' },
  //         },
  //       },
  //     },
  //   },
  // })
  // @ApiResponse({ status: 404, description: 'Không tìm thấy khuyến mãi' })
  // async deletePromotion(
  //   @Param('id') id: string,
  // ): Promise<{ data: { success: boolean; message: string } }> {
  //   const result = await this.promotionService.deletePromotion(id);

  //   if (result.error) {
  //     throw new Error(result.error);
  //   }

  //   return result as { data: { success: boolean; message: string } };
  // }
}
