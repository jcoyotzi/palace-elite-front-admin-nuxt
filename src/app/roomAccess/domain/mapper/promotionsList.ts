export class PromotionsList {
  public static map(promotion: any, isNational: boolean) {
    return {
      title: this.getTitle(promotion.Message),
      content: this.getContent(promotion?.PromotionCondYUses?.Message),
      media: {
        url: this.getTitle(promotion.Message) === 'FAST FORWARD TO SPRING' ? 'https://d2azgexewbdl23.cloudfront.net/content/p_elite_mlk_2023_eng_v1_316x250_5dd6d839f8.jpg' : 'https://d396g00xwrhdnt.cloudfront.net/content/lblc_Private_Teepee_5_1_026b458c07.png?updated_at=2022-10-07T21:33:43.967Z',
        alt: 'img-example',
        title: 'img-example',
        mime: 'image/jpeg'
      },
      button: {
        label: 'TAKE THIS OFFER',
        url: '#'
      },
      countdown: this.getCountdown(promotion.PromotionBookingWindow),
      promotion: {
          RecnumPromo: promotion.Recnum,
          CodePromo: promotion.Code,
          Status: 1,
          PromotionsPackage: this.FilterPackageRateByMember(promotion.PackageByPromotion, isNational),
          PromotionByRsvBloqued: promotion.ReservationUnlock ? {
          HotelBlocked: promotion.ReservationUnlock.Hotel,
          FolioBlocked: promotion.ReservationUnlock.Folio
        } : null
      }
    }
  }

  public static FilterPackageRateByMember(PackageByPromotion: any, IsNational: any){
    var Response = null;
    if(PackageByPromotion != null && PackageByPromotion.length > 0){
      Response = PackageByPromotion.filter(function(a: any){ return (IsNational && a.TypeMember == "N") || (!IsNational && a.TypeMember == "F") || a.TypeMember == "B"});
     }
     return Response
  }

  public static getTitle(messaje: string){
    const titleJSON = JSON.parse(messaje)
    if(!titleJSON.Title.length)
      return titleJSON.Title.en
    if( titleJSON.Title.length > 0 )
      return titleJSON.Title[0].en
    else {
      const today = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
      const titlePromotion = titleJSON.Title.find((dates: any) => new Date(today) >= new Date(dates.BWInit) && new Date(today) <= new Date(dates.BWEnd))
      return titlePromotion?.en
    }
  }

  public static getContent(message: string){
    if (!message) return ''
    const titleJSON = JSON.parse(message)
    if( titleJSON.length > 0 ) {
      return titleJSON[0].en
    } else {
      return ''
    }
  }
  
  public static getCountdown(countdown: any[]){
    if(countdown.length > 0){
      const date = new Date(countdown[0].EndDate)
      return {
        title: 'HURRY! PROMOTION ENDS IN:',
        endDate: date,
        days: 'Days',
        hours: 'Hours',
        minutes: 'Minutes',
        seconds: 'seconds'
      }
    } else {
      return null
    }
  }
}
