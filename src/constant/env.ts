export const isProd = process.env.NODE_ENV === 'production'
export const isLocal = process.env.NODE_ENV === 'development'

export const showLogger = isLocal
	? true
	: process.env.NEXT_PUBLIC_SHOW_LOGGER === 'true' ?? false

export const contractAddress =
	'0xf9772ca577617c86ef33a5e4725da4b960190787' as const
