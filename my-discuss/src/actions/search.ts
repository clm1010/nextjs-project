'use server'

import { redirect } from 'next/navigation'

export async function Search(formData: FormData) {
  const postNameOrContent = formData.get('postnameorcontent')

  if (typeof postNameOrContent !== 'string' || !postNameOrContent) {
    redirect('/')
  }

  redirect(`/search?postnameorcontent=${postNameOrContent}`)
}
