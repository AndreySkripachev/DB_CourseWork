export abstract class MapperFromDto<TDto, TModel> {
  /**
   * Maps dto to model.
   * @param dto Type dto.
   */
  public abstract fromDto(dto: TDto): TModel;
}

export abstract class MapperToDto<TDto, TModel> {
  /**
   * Maps model to dto.
   * @param model Type model.
   */
  public abstract toDto(model: TModel): TDto;
}

export abstract class Mapper<TDto, TModel>
  implements MapperFromDto<TDto, TModel>, MapperToDto<TDto, TModel>
{
  /**
   * @inheritdoc
   */
  public abstract fromDto(dto: TDto): TModel;

  /**
   * @inheritdoc
   */
  public abstract toDto(model: TModel): TDto;
}
