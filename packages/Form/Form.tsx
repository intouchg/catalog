import { useState } from 'react'
import { Checkbox, Radio, Toggle, Select, styled } from '@intouchg/components'

const Label = styled.label`
	width: fit-content;
`

export const Form = (props: React.ComponentProps<'form'>) => {
	const [errors, setErrors] = useState<string[]>([])

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		setErrors([])

		const target = event.target as HTMLFormElement
		event.preventDefault()

		const formData = [...new FormData(target).entries()].reduce(
			(acc: Record<string, FormDataEntryValue>, cur) => {
				acc[cur[0]] = cur[1]
				return acc
			},
			{}
		)

		console.log('Submitted', formData)
		const formErrors = []

		if (!formData.firstName) {
			formErrors.push('Please enter your first name.')
		}
		if (!formData.lastName) {
			formErrors.push('Please enter your last name.')
		}
		if (!formData.acceptPolicy) {
			formErrors.push('You must accept the Privacy Policy.')
		}

		setErrors(formErrors)
	}

	return (
		<form css={{ display: 'grid', rowGap: 16 }} onSubmit={handleSubmit}>
			<input name="firstName" placeholder="First Name" />
			<input name="lastName" placeholder="Last Name" />
			<div>
				<Label htmlFor="channel">Visiting from channel:</Label>
				<Select id="channel" name="channel">
					<option value="web">Web</option>
					<option value="mobile">Mobile</option>
					<option value="email">Email</option>
				</Select>
			</div>
			<fieldset css={{ display: 'grid' }}>
				<legend>Select your interests:</legend>
				<Label>
					<Checkbox
						name="interest"
						value="advertising"
						defaultChecked
					/>
					&nbsp; Advertising
				</Label>
				<Label>
					<Checkbox name="interest" value="marketing" />
					&nbsp; Marketing
				</Label>
				<Label>
					<Checkbox name="interest" value="technology" />
					&nbsp; Technology
				</Label>
			</fieldset>
			<fieldset css={{ display: 'grid' }}>
				<legend>Allow us to contact you?</legend>
				<Label>
					<Radio name="allowContact" value="true" defaultChecked />
					&nbsp; Yes
				</Label>
				<Label>
					<Radio name="allowContact" value="false" />
					&nbsp; No
				</Label>
			</fieldset>
			<Label
				css={{
					display: 'flex',
					alignItems: 'center',
				}}
			>
				<Toggle name="acceptPolicy" />
				&nbsp; Agree to our Privacy Policy
			</Label>
			<div>
				{Boolean(errors.length) &&
					errors.map((error) => (
						<p key={error} css={{ color: 'red' }}>
							{error}
						</p>
					))}
			</div>
			<button type="submit">Submit</button>
			<button type="reset" onClick={() => setErrors([])}>
				Reset
			</button>
		</form>
	)
}
