import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { User } from './user';

interface BookAttributes {

  bookId: number;
  title: string;
  author: string;
  isbn: string;
  
}

interface BookCreationAttributes extends Optional<BookAttributes, 'bookId'> {}

export class Book extends Model<BookAttributes, BookCreationAttributes> implements BookAttributes {
  public bookId!: number;
  public title!: string;
  public author!: string;
  public isbn!: string;

  // associated User model
  public readonly assignedUser?: User;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function BookFactory(sequelize: Sequelize): typeof Book {
  Book.init(
    {
      bookId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isbn: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      tableName: 'books',
      sequelize,
    }
  );

  return Book;
}
