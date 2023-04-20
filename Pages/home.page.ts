import { expect, Locator, Page } from '@playwright/test';

export class HomePage{
    page: Page;
    username: Locator;
    password: Locator;
    submitbutton: Locator;
    combo_location: Locator;
    combo_hotel: Locator;
    combo_roomtype: Locator;
    combo_numberRooms: Locator;
    text_checkinDate: Locator;
    text_checkoutDate: Locator;
    button_submit: Locator;

    constructor(page){
        this.page=page;
        this.username=this.page.locator('//*[@id="username"]');
        this.password =this.page.locator('//*[@id="password"]');
        this.submitbutton=this.page.locator('//*[@id="login"]');
        this.combo_location=this.page.locator('//*[@id="location"]')
        this.combo_hotel=this.page.locator('//*[@id="hotels"]')
        this.combo_roomtype=this.page.locator('//*[@id="room_type"]')
        this.combo_numberRooms=this.page.locator('//*[@id="room_nos"]')
        this.text_checkinDate=this.page.locator("#datepick_in")
        this.text_checkoutDate=this.page.locator("#datepick_out")
        this.button_submit=this.page.locator("#Submit")


    }
    async navigate_homepage(){
        await this.page.goto("http://adactinhotelapp.com/");
        await expect(this.page).toHaveTitle("Adactin.com - Hotel Reservation System");
    }
    async login_hotelapp(user, pass){
       
        await this.username.fill(user)
        await this.password.fill(pass)
        await this.submitbutton.click()
        await expect(this.page).toHaveTitle("Adactin.com - Search Hotel");    
    }
    async select_hotel(location,hotel,room_type,room_nos,checkin_date,checkout_date){
        await this.combo_location.selectOption(location);
        await this.combo_hotel.selectOption(hotel)
        await this.combo_roomtype.selectOption(room_type)
        await this.combo_numberRooms.selectOption(room_nos)
        await this.text_checkinDate.fill(checkin_date)
        await this.text_checkoutDate.fill(checkout_date)
        await this.button_submit.click()
        
       

    }

}