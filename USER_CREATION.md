# Steps to Create Users and Groups in AWS account

## Create User
1. Login to AWS account as root user or user with AdminAccess

2. Goto IAM > Users > Click on Create User
3. specify user email
4. enable checkbox for Provide user access to the AWS Management Console - optional
5. select radio button I want to create an IAM user  > click Next
6. In Set permissions page , select group which user belongs to or attach IAM policies explicitely
7. User will be created and initial login credentials will be shared on console , Download and share these credentials with user
8. User have to login to aws console with initial credentials and change the password
9. After User creation , Goto IAM → Users →  select created username →  goto Security credentials → select Assign MFA Device for this user
10. To get programatic access , goto Security credentials tab for that user and select Create access key →  specify reason for key creation → Make sure to download the access key and security access key

## Create Group
1. Login to AWS account as root user or user with AdminAccess
2. Goto IAM > Users Groups > Click on Create group
3. specify group name and attach permission policies to this groups
4. add users to this group

