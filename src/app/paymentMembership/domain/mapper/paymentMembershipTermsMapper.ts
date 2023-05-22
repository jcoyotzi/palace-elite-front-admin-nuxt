import CollectionType from '../entities/collectionType'


export class PaymentMembershipTermsMapper {
  public static transform(termsAndConditions: CollectionType[]) {
    return {
      terms: this.getTermsAndConditions(termsAndConditions),
      privacy: this.getPrivacyNotices(termsAndConditions)
    }
  }

  public static getTermsAndConditions(termsAndConditions: CollectionType[]) {
    const terms = termsAndConditions.filter((item) => item.attributes.code === 'membership-payment-terms-conditions')
    return {
      title: terms[0]?.attributes?.title || '',
      content: terms[0]?.attributes?.content || '',
    }
  }

  public static getPrivacyNotices(termsAndConditions: CollectionType[]) {
    const privacy = termsAndConditions.filter((item) => item.attributes.code === 'membership-privacy-notices')
    return {
      title: privacy[0]?.attributes?.title || '',
      content: privacy[0]?.attributes?.content || ''
    }
  }
}
