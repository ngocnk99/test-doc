import { ApiProperty } from '@nestjs/swagger';

/**
 * Enum cho trạng thái khuyến mãi
 */
export enum PromotionStatus {
  DRAFT = -2, // Nháp
  REJECTED = -1, // Từ chối
  PENDING = 0, // Chờ duyệt
  NOT_STARTED = 1, // Chưa bắt đầu
  ACTIVE = 2, // Đang diễn ra
  ENDED = 3, // Kết thúc
}

/**
 * Enum cho loại khuyến mãi
 */
export enum PromotionType {
  ORDER_DISCOUNT = 1, // Giảm giá đơn hàng
  ITEM_DISCOUNT = 2, // Giảm giá SP/DV đi kèm
  PRODUCT_GIFT = 3, // Tặng sản phẩm/dịch vụ
  OTHER_GIFT = 4, // Tặng quà tặng khác
}

/**
 * Enum cho cách chọn sản phẩm
 */
export enum ChooseType {
  ALL = 1, // Tất cả sản phẩm
  BY_GROUP = 2, // Theo nhóm sản phẩm
  SPECIFIC = 3, // Sản phẩm cụ thể
}

/**
 * DTO cho bộ lọc chi tiết
 */
export class DetailFilterDto {
  @ApiProperty({
    description: 'Kích thước',
    example: '185_X_127_X_227',
    required: false,
  })
  SIZE?: string;

  @ApiProperty({
    description: 'Thương hiệu',
    example: 'GS',
    required: false,
  })
  BRAND?: string;

  @ApiProperty({
    description: 'Dung lượng',
    example: '35AH',
    required: false,
  })
  CAPACITY?: string;

  @ApiProperty({
    description: 'Xuất xứ',
    example: 'VIET_NAM',
    required: false,
  })
  ORIGIN?: string;

  @ApiProperty({
    description: 'Mâm',
    example: '16_INCH',
    required: false,
  })
  RIM?: string;
}

/**
 * DTO cho chi tiết khuyến mãi
 */
export class PromotionDetailDto {
  @ApiProperty({
    description: 'ID của chi tiết khuyến mãi',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  id?: string;

  @ApiProperty({
    description: 'Tên của chi tiết khuyến mãi',
    example: 'Giảm giá 10% cho lốp ô tô',
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'Điều kiện số tiền mua tối thiểu để nhận giảm giá',
    example: 500000,
    required: false,
    type: Number,
  })
  min_price?: number;

  @ApiProperty({
    description: 'Điều kiện số sản phẩm tối thiểu để được giảm giá',
    example: 2,
    required: false,
    type: Number,
  })
  min_quantity?: number;

  @ApiProperty({
    description: 'Tỷ lệ giảm giá (%, VND)',
    example: 10,
    required: false,
    type: Number,
  })
  discount?: number;

  @ApiProperty({
    description: 'Số lượng quà tặng',
    example: 1,
    required: false,
    type: Number,
  })
  gift_quantity?: number;

  @ApiProperty({
    description: 'Loại khuyến mãi',
    enum: PromotionType,
    example: PromotionType.ORDER_DISCOUNT,
  })
  promotion_type: PromotionType;

  @ApiProperty({
    description: 'ID sản phẩm tặng kèm (nếu có)',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  product_id?: string;

  @ApiProperty({
    description: 'Tên quà tặng (nếu không phải sản phẩm trong hệ thống)',
    example: 'Móc khóa ô tô',
    required: false,
  })
  gift_name?: string;
}

/**
 * DTO cho sản phẩm khuyến mãi
 */
export class PromotionProductDto {
  @ApiProperty({
    description: 'ID của sản phẩm khuyến mãi',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  id?: string;

  @ApiProperty({
    description: 'Cách chọn sản phẩm',
    enum: ChooseType,
    example: ChooseType.BY_GROUP,
  })
  choose_type: ChooseType;

  @ApiProperty({
    description: 'Danh sách ID sản phẩm loại trừ',
    isArray: true,
    example: ['323e4567-e89b-12d3-a456-426614174000'],
    required: false,
  })
  not_product_ids?: string[];

  @ApiProperty({
    description:
      "Các trường theo mảng //  ['SAN_PHAM', 'LOP'] => khuyến mãi tất cả sp lốp ",
    isArray: true,
    example: ['SAN_PHAM', 'LOP'],
    required: false,
  })
  array_fields?: string[];

  @ApiProperty({
    description: 'Bộ lọc chi tiết',
    type: DetailFilterDto,
    required: false,
  })
  detail_filter?: DetailFilterDto;

  @ApiProperty({
    description: 'Số lượng sản phẩm đang áp dụng',
    example: 50,
    required: false,
  })
  count_product_active?: number;

  @ApiProperty({
    description: 'Thông tin bổ sung về sản phẩm',
    example: [
      {
        classify: [2014, 2015],
        product_id: '8d32ad81-9a56-4f1d-a3eb-4d586da881d9',
        product: {
          comment:
            'sẽ có khi get detail, lúc tạo và sửa không cần truyền thông tin product',
          comment1:
            'bắt buộc truyền product_infos truyền khi ChooseType =3 (SPECIFIC) ',
          comment3:
            'classify là phân loại của lốp, các sản phẩm dịch vụ khác truyền là classify ["ALL"], lốp chọn phân loại nào thì truyền phân loại đó, tất cả thì là ALL',
        },
      },
      {
        classify: ['ALL'],
        product_id: '52cf731a-fd90-4839-8aea-7d987eb1c7f5',
        product: {
          comment: 'sẽ có khi get detail',
        },
      },
    ],
    required: false,
  })
  product_infos?: Record<string, any>[];
}
export class PromotionCart {
  @ApiProperty({
    description: 'ID của car',
    example: 111111,
  })
  cart_id: number;

  @ApiProperty({
    description: '-1 : khuyến mãi cho lĩnh vực spdv , 1: cho spdv cụ thể',
    example: 1,
  })
  type: 1 | -1;

  @ApiProperty({
    description:
      ' Giảm giá đơn hàng. Chi tiết khuyến mã, sẽ trả ra khi getDetail, getlist không có',
    type: [PromotionDetailDto],
    required: true,
  })
  ORDER_DISCOUNT: PromotionDetailDto[];

  @ApiProperty({
    description:
      'Giảm giá SP/DV đi kèm. Chi tiết khuyến mã, sẽ trả ra khi getDetail, getlist không có',
    type: [PromotionDetailDto],
    required: true,
  })
  ITEM_DISCOUNT: PromotionDetailDto[];

  @ApiProperty({
    description:
      'Tặng sản phẩm/dịch vụ. Chi tiết khuyến mã, sẽ trả ra khi getDetail, getlist không có',
    type: [PromotionDetailDto],
    required: true,
  })
  PRODUCT_GIFT: PromotionDetailDto[];

  @ApiProperty({
    description:
      ' Giảm giá đơn hàng. Chi tiết khuyến mã, sẽ trả ra khi getDetail, getlist không có',
    type: [PromotionDetailDto],
    required: true,
  })
  OTHER_GIFT: PromotionDetailDto[];

  @ApiProperty({
    description:
      'Để là mảng về sau có thể mở rộng, bên  khuyến mãi cho lĩnh vực spdv thì là mảng có 1 phần tử.Sản phẩm khuyến mãi, sẽ trả ra khi getDetail, getlist không có',
    type: [PromotionProductDto],
    required: true,
  })
  promotion_product: PromotionProductDto[];
}

/**
 * DTO cho tạo khuyến mãi
 */
export class CreatePromotionDto {
  @ApiProperty({
    description: 'Tên của khuyến mãi',
    example: 'Khuyến mãi cuối năm',
  })
  name: string;

  @ApiProperty({
    description: 'Mô tả của khuyến mãi',
    example: 'Giảm giá 10% tất cả sản phẩm dịch vụ',
  })
  description: string;

  @ApiProperty({
    description: 'Thời gian bắt đầu',
    example: '2024-12-01T00:00:00+00:00',
  })
  start_time: string;

  @ApiProperty({
    description: 'Thời gian kết thúc',
    example: '2026-01-01T00:00:00+00:00',
  })
  end_time: string;

  @ApiProperty({
    description: 'Số lượng có thể chọn',
    example: 1,
    default: 1,
    required: false,
  })
  quantity_available?: number;

  @ApiProperty({
    description: 'ID của garage',
    example: '171b3378-b083-41c7-aed8-cdbc8cd569e0',
  })
  garage_id: string;

  @ApiProperty({
    description: 'Trạng thái khuyến mãi',
    enum: PromotionStatus,
    example: PromotionStatus.DRAFT,
    required: false,
  })
  status?: PromotionStatus;

  @ApiProperty({
    description: 'Khuyến mãi có đang active hay không',
    example: false,
    required: false,
  })
  is_active?: boolean;

  @ApiProperty({
    description: 'Ghi chú',
    example: 'Áp dụng cho khách hàng VIP',
    required: false,
  })
  note?: string;

  @ApiProperty({
    description: 'Chi tiết khuyến mãi',
    type: [PromotionCart],
    required: false,
  })
  promotion_cart?: PromotionCart[];
}

/**
 * DTO cho cập nhật khuyến mãi
 */
export class UpdatePromotionDto extends CreatePromotionDto {}

/**
 * DTO cho query params
 */
export class PromotionQueryParamsDto {
  @ApiProperty({
    description: 'Tìm kiếm theo tên',
    example: 'cuối năm',
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'Lọc theo trạng thái',
    example: [2],
    isArray: true,
    enum: PromotionStatus,
    required: false,
  })
  status?: PromotionStatus[];

  @ApiProperty({
    description: 'ID của garage',
    example: '171b3378-b083-41c7-aed8-cdbc8cd569e0',
  })
  garage_id: string;

  @ApiProperty({
    description: 'Thời gian bắt đầu lọc',
    example: '2024-11-01T00:00:00+00:00',
    required: false,
  })
  from_time?: string;

  @ApiProperty({
    description: 'Thời gian kết thúc lọc',
    example: '2025-01-01T00:00:00+00:00',
    required: false,
  })
  to_time?: string;

  @ApiProperty({
    description: 'Lọc theo loại khuyến mãi',
    isArray: true,
    enum: PromotionType,
    example: [PromotionType.ORDER_DISCOUNT],
    required: false,
  })
  promotion_type?: PromotionType[];

  @ApiProperty({
    description: 'Trang hiện tại',
    example: 1,
    default: 1,
    required: false,
  })
  page?: number;

  @ApiProperty({
    description: 'Số bản ghi mỗi trang',
    example: 10,
    default: 10,
    required: false,
  })
  pageSize?: number;

  @ApiProperty({
    description: 'Sắp xếp theo thời gian tạo (true: tăng dần, false: giảm dần)',
    example: false,
    required: false,
  })
  sort_created_at?: boolean;
}

/**
 * DTO cho phản hồi chi tiết khuyến mãi
 */
export class PromotionResponseDto {
  @ApiProperty({
    description: 'ID của khuyến mãi',
    example: '701951f0-41ca-4751-9a3a-8a14fd4069b2',
  })
  id: string;

  @ApiProperty({
    description: 'Thời gian cập nhật',
    example: '2024-12-10T06:43:24.854787+00:00',
  })
  updated_at: string;

  @ApiProperty({
    description: 'Thời gian tạo',
    example: '2024-12-10T06:43:24.854787+00:00',
  })
  created_at: string;

  @ApiProperty({
    description: 'ID của garage',
    example: '171b3378-b083-41c7-aed8-cdbc8cd569e0',
  })
  garage_id: string;

  @ApiProperty({
    description: 'Tên của khuyến mãi',
    example: 'Khuyến mãi cuối năm',
  })
  name: string;

  @ApiProperty({
    description: 'Mô tả của khuyến mãi',
    example: 'Giảm giá 10% tất cả sản phẩm dịch vụ',
  })
  description: string;

  @ApiProperty({
    description: 'Thời gian bắt đầu',
    example: '2024-12-01T00:00:00+00:00',
  })
  start_time: string;

  @ApiProperty({
    description: 'Thời gian kết thúc',
    example: '2026-01-01T00:00:00+00:00',
  })
  end_time: string;

  @ApiProperty({
    description: 'Trạng thái khuyến mãi',
    enum: PromotionStatus,
    example: PromotionStatus.ACTIVE,
  })
  status: PromotionStatus;

  @ApiProperty({
    description: 'Số lượng có thể chọn',
    example: 1,
  })
  quantity_available: number;

  @ApiProperty({
    description: 'Trạng thái tạo sản phẩm khuyến mãi',
    example: true,
  })
  generated_product_status: boolean;

  @ApiProperty({
    description: 'Số lượng sản phẩm đang áp dụng',
    example: 1659,
  })
  count_product_active: number;

  @ApiProperty({
    description: 'Khuyến mãi có đang active hay không',
    example: false,
  })
  is_active: boolean;

  @ApiProperty({
    description: 'Ghi chú',
    example: null,
    required: false,
  })
  note: string | null;

  @ApiProperty({
    description:
      'Chi tiết khuyến mã, sẽ trả ra khi getDetail, getlist không có',
    type: [PromotionCart],
    required: false,
  })
  promotion_cart?: PromotionCart[];
}

/**
 * DTO cho phản hồi danh sách khuyến mãi
 */
export class PromotionListResponseDto {
  @ApiProperty({
    description: 'Danh sách khuyến mãi',
    type: [PromotionResponseDto],
  })
  data: PromotionResponseDto[];

  @ApiProperty({
    description: 'Tổng số khuyến mãi',
    example: 1,
  })
  count: number;
}
