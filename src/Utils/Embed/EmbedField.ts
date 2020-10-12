/* eslint-disable no-mixed-spaces-and-tabs */
export interface IEmbedField {
  name: string;
  value: string;
  inline: boolean;
}

export class EmbedFieldBuilder {
  private name!: string;
  private value!: string;
  private inline = false;

  public setName(name: string): EmbedFieldBuilder {
    this.name = name;
    return this;
  }

  public setValue(value: string): EmbedFieldBuilder {
    this.value = value;
    return this;
  }

  public enableInline(inline: boolean): EmbedFieldBuilder {
    this.inline = inline;
    return this;
  }

  public build(): IEmbedField {
    return {
      name: this.name,
      value: this.value,
      inline: this.inline,
    };
  }
}
