import {membershipTemplate} from './membership_template'
import ActivityEntity, {
  activitiesByCategory
} from '~/src/app/benefits/domain/entities/activityEntity'

interface TemplateParams {
  name: string
  affiliationId: string
  activitiesByCategory: activitiesByCategory
  total: number
}

const getActivitiesContent = (activities: any) => {
  const categories = Object.keys(activities)

  return categories
    .map((item): string => {
      const getActivitiesList = (item: ActivityEntity[]) => {
        return item
          .map((activitie: ActivityEntity) => {
            return `
          <tr>
            <td width="5%">
              <p style="font-size: 12px;">${activitie.quantity}</p>
            </td>
            <td width="70%">
              <p style="font-size: 12px;">${activitie.title}</p>
            </td>
            <td width="25%" align="right">
              <p style="font-size: 12px;">$${activitie.price}  USD</p>
            </td>
          </tr>
        `
          })
          .join('')
      }

      return `
      <table style="width: 100%;">
        <tbody>
          <tr>
            <p style="font-size: 12px; text-transform: uppercase; margin: 0;">${item}</p>
          </tr>
          ${getActivitiesList(activities[item])}
        </tbody>
      </table>
    `
    })
    .join('')
}

const generateContent = ({
  name,
  affiliationId,
  activitiesByCategory,
  total
}: TemplateParams): string => {
  return `
    <table style="width: 85%; margin: 35px auto;border-spacing: 0px;">
      <tbody style="width: 100%;">
        <tr>
          <td style="margin-bottom: 30px;">
            <h1 style="font-size: 22px;font-weight: 300;">${name}</h1>
            <p style="font-size: 16px; font-weight: 300;">${affiliationId}</p>
            <p style="font-size: 12px; font-weight: 300; margin-bottom: 30px;">Please find below the selection of activities and tours in the Resort Credit calculator</p>
          </td>
        </tr>
        <tr>
          <td>
            ${getActivitiesContent(activitiesByCategory)}
          </td>
        </tr>
        <tr>
          <td>
            <table style="width: 100%;">
              <tr>
                <td>
                  <p style="font-size: 14px;">Total</p>
                </td>
                <td align="right">
                  <p style="font-size: 14px;">${total} USD</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td>
            <p style="font-size: 12px; margin-top: 30px;">*Please remember that the tool is a simulation and all the prices or activities are subject to change without notice.</p>
          </td>
        </tr>
        <tr>
          <td>
            <a href="https://palaceelite.com/benefits/programs/resort-credit" style="color:#90AFC5; font-size: 12px;">Terms and conditions</a>
          </td>
        </tr>
      </tbody>
    </table>
  `
}

const resortCreditTemplate = ({
  name,
  affiliationId,
  activitiesByCategory,
  total
}: TemplateParams): string => {
  const content = generateContent({name, affiliationId, activitiesByCategory, total})

  return membershipTemplate(content)
}

export {resortCreditTemplate}
