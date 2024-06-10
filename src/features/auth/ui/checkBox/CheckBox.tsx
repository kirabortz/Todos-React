import React from "react"
import * as Checkbox from "@radix-ui/react-checkbox"
import { CheckIcon } from "@radix-ui/react-icons"
import styles from "features/auth/ui/checkBox/CheckBox.module.css"
import { useController, UseControllerProps } from "react-hook-form"
import { LoginProps } from "features/auth/ui/login/login.types"

type Props<T extends LoginProps> = UseControllerProps<T>

export const CheckBox = <T extends LoginProps>({ name, control }: Props<T>) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  })
  return (
    <div className={styles.container}>
      <Checkbox.Root
        className={styles.CheckboxRoot}
        defaultChecked
        id="c1"
        checked={!!value}
        name={name}
        onCheckedChange={onChange}
      >
        <Checkbox.Indicator className={styles.CheckboxIndicator}>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label className="Label" htmlFor="c1">
        Accept terms and conditions.
      </label>
    </div>
  )
}
