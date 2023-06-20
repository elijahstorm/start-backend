export enum Return { 

//common-------------------------
    OK = 0,
    Not_Exist_Email = 1,
    NOT_EMAIL_VARIFI_USER = 2,

    

//user---------------------------
    //join 
    Exist_Email = 10000,
    Exist_Nickname = 10001,

    //login
    Fail_Login = 11000,
    
    //sendValidEmail
    Over_Max_Count = 12000,

    //conformValidEmail
    Over_Time = 13000,
    Wrong_Code = 13001,

    
}

export enum eTempType { 
    
    Valid_Email = 0

}