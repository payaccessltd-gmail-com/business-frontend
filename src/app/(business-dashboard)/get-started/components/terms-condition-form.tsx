import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from "zod"

const merchantRegFormSchema = zod.object({
  country: zod.string(),
  firstName: zod.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: zod.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),

  emailAddress: zod.string().email({ message: "Invalid email address" }),
  password: zod.string().min(2, {
    message: "",
  }),
  businessName: zod.string(),
  businessType: zod.string(),
  businessCategory: zod.string(),
  isSoftwareDeveloper: zod.string(),
})


export default function TermsConditionForm() {

}