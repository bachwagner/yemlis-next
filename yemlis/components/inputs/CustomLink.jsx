import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import NextLink from 'next/link'

export default function CustomLink({ label, target, variant }) {

    return (
        <Link
            href={target}
            component={NextLink}
            fontSize={18}
            sx={{textDecoration: 'underline'}}
            variant={!variant ? "inherit" : variant}>
            {label}
        </Link>
    )
}