import { cn } from "cn"

import { Button } from "../../../../components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "../../../../components/ui/field"
import { Input } from "../../../../components/ui/input"
import { Link } from "react-router"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import type { AppDispatch, RootState } from "../../../../store/store"
import { signup } from "../../../../reducers/authReducer"

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state: RootState) => state.auth)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const result = await dispatch(signup({ email, password }))
    if (signup.fulfilled.match(result)) {
      navigate("/")
    }
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Signup to your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Enter your email below to signup to your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
          </div>
          <Input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </Field>
        {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
        <Field>
          <Button type="submit" disabled={loading}>{loading ? "Creating account..." : "Signup"}</Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <FieldDescription className="text-center">
            Login to the account?{" "}
            <Link to="/" className="underline underline-offset-4">
              Login
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
