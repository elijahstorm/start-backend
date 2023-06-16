export enum Return { 
    
    OK = 0,

//user---------------------------
    //join 
    Exist_Email = 10000,
    Exist_Nickname = 10001,

    //login
    Fail_Login = 11000,
    NOT_EMAIL_VARIFI_USER = 11001,
    
    //sendValidEmail
    Over_Max_Count = 12000,

    //conformValidEmail
    Over_Time = 13000,
    Wrong_Code = 13001

    
}

export enum eTempType { 
    
    Valid_Email = 0

}