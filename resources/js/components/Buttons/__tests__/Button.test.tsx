import { SizeEnum } from '@/enums/SizeEnum'
import { renderWithRouter } from '@/test/utils'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import Button from '../Button'
import { ButtonTypeEnum } from '../enums/buttonType.enum'
import { ButtonVariantEnum } from '../enums/buttonVariant.enum'

describe('Button', () => {
  it('renderiza children', () => {
    render(<Button>Enviar</Button>)
    expect(screen.getByText('Enviar')).toBeInTheDocument()
  })

  it('renderiza como button por defecto', () => {
    render(<Button>Enviar</Button>)
    const btn = screen.getByText('Enviar').closest('button')
    expect(btn).not.toBeNull()
  })

  it('tiene type=button por defecto', () => {
    render(<Button>Enviar</Button>)
    const btn = screen.getByText('Enviar').closest('button')!
    expect(btn).toHaveAttribute('type', 'button')
  })

  it('tiene type=submit cuando type=Submit', () => {
    render(<Button type={ButtonTypeEnum.Submit}>Enviar</Button>)
    const btn = screen.getByText('Enviar').closest('button')!
    expect(btn).toHaveAttribute('type', 'submit')
  })

  it('aplica color primary por defecto', () => {
    render(<Button>Enviar</Button>)
    expect(screen.getByText('Enviar').closest('button')).toHaveClass('btn-primary')
  })

  it('aplica color danger', () => {
    render(<Button color="danger">Enviar</Button>)
    expect(screen.getByText('Enviar').closest('button')).toHaveClass('btn-danger')
  })

  it('aplica variant outline', () => {
    render(<Button variant={ButtonVariantEnum.Outline}>Enviar</Button>)
    expect(screen.getByText('Enviar').closest('button')).toHaveClass('btn-outline-primary')
  })

  it('aplica disabled cuando se pasa', () => {
    render(<Button disabled>Enviar</Button>)
    expect(screen.getByText('Enviar').closest('button')).toBeDisabled()
  })

  it('aplica disabled cuando loading=true', () => {
    render(<Button loading>Enviar</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('muestra spinner cuando loading=true', () => {
    render(<Button loading>Enviar</Button>)
    expect(document.querySelector('.animate-spin')).not.toBeNull()
  })

  it('llama onClick al hacer click', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Enviar</Button>)
    await user.click(screen.getByText('Enviar'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('no llama onClick cuando está disabled', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Button disabled onClick={onClick}>
        Enviar
      </Button>
    )
    await user.click(screen.getByText('Enviar'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('aplica className adicional', () => {
    render(<Button className="custom-class">Enviar</Button>)
    expect(screen.getByText('Enviar').closest('button')).toHaveClass('custom-class')
  })

  it('aplica size SM', () => {
    render(<Button size={SizeEnum.SM}>Enviar</Button>)
    expect(screen.getByText('Enviar').closest('button')).toHaveClass('p-2')
  })

  it('aplica size LG', () => {
    render(<Button size={SizeEnum.LG}>Enviar</Button>)
    expect(screen.getByText('Enviar').closest('button')).toHaveClass('p-3')
  })

  it('renderiza como Link cuando type=Link', () => {
    const { container } = renderWithRouter(
      <Button type={ButtonTypeEnum.Link} to="/">
        Inicio
      </Button>
    )
    const link = container.querySelector('a')
    expect(link).not.toBeNull()
    expect(link).toHaveAttribute('href')
  })
})
