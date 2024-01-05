const Sequelize = require('sequelize');

class User extends Sequelize.Model {
  // 테이블에 대한 설정
  static initiate(sequelize) {
    User.init(
      // 테이블 컬럼에 대한 설정
      {
        // 알아서 id를 기본키로 연결하므로 적을 필요 없음
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        age: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        comment: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      // 테이블 자체에 대한 설정, 테이블 옵션
      {
        // static initiate 메서드의 매개변수와 연결되는 옵션
        // db.sequelize 객체를 넣어서 model/index.js 와 연결
        sequelize,
        // createAt, updateAt 컬럼을 추가
        timestamps: false,
        // 시퀄라이즈는 기본적으로 테이블명과 컬럼명을 카멜케이스로 만듦
        // 이걸 스네이크 케이스로 바꾸는 옵션
        underscored: false,
        // 모델 네임 설정, 노드 프로젝트에서 사용
        modelName: 'User',
        // 실제 데이터베이스 테이블 이름
        // 모델 이름을 소문자 및 복수형으로 만듦
        tableName: 'users',
        // true로 설정 시 deleteAt 컬럼 생성
        // 로우 삭제 시 완전 삭제하지 않고 deleteAt에 지운 시각 기록
        // 조회 시 deleteAt가 null 인 로우를 조회
        // 나중에 다시 로우를 복원 필요할때 사용
        paranoid: false,
        // 한글 입력
        // 이모티콘 입력시 utf8mb4, utf8mb4_general_ci
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  // 다른 모델과의 관계
  static associate(db) {}
}
module.exports = User;
