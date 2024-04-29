import { IS_IN_PROD } from "../../Constants/Constants"
import { MONGO_CLIENT } from "../mongoDBClient"
import { UserInfo } from "./types/UserInfo"

// Database and collection names
const DB_NAME = IS_IN_PROD ? "abit-user-info-db" : "abit-user-info-db-test"
const COLLECTION_NAME = "abit-user-info-col"

export class UserInfoRepository {
  public static async getUserInfo(userId: string): Promise<UserInfo> {
    const response = await MONGO_CLIENT.db(DB_NAME).collection(COLLECTION_NAME).findOne<UserInfo>({ userId: userId })

    // const userInfo: UserInfo = response as unknown as UserInfo

    return response
  }

  public static async saveOrUpdateUserInfo(userInfo: UserInfo): Promise<void> {
    await MONGO_CLIENT.db(DB_NAME).collection(COLLECTION_NAME).updateOne(
      { userId: userInfo.TgUserId }, // filter
      { $set: userInfo }, // update
      { upsert: true } // options
    )
  }

  // public async updateUserInfo(userInfo: UserInfo): Promise<void> {
  //   await MONGO_CLIENT.db(DB_NAME)
  //     .collection(COLLECTION_NAME)
  //     .updateOne({ userId: userInfo.userId }, { $set: userInfo })
  // }

  //   public async deleteUserInfo(userId: string): Promise<void> {
  //     await this.db.deleteUserInfo(userId)
  //   }
}
