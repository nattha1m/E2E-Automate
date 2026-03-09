Stucture project

1.ไฟล์ test case ใน Folder tests เช่น E2E-BuyProducts.spec

2.ไฟล์ function จากหน้าต่างๆ ใน Folder page เช่น login-page, products-list-page และ อื่นๆเป็นต้น

3.ไฟล์ data.json สำหรับเก็บข้อมูล username , password ไว้ใน Folder Data

How to run test

1.Clone project automate-assignment > Github git@github.com:nattha1m/E2E-Automate.git

2.npm install

3.Run test file E2E-BuyProducts.spec > npx playwright test E2E-BuyProducts.spec --debug
(ในกรณี tests อยู่ใน Folder Test Automate ต้องทำการ cd เพื่อเข้าสู่ tests ก่อน เช่น cd tests)