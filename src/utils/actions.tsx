import { IconDashboard, IconFileText, IconHome } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"

function actions () {
  const navigate = useNavigate()
  
  return ([
    {
      title: 'Inicio',
      description: 'Dashboard de inicio para ver resumen de la plataforma',
      onTrigger: () => navigate('/admin/dashboard'),
      icon: <IconHome size="1.2rem" />,
    },
    {
      title: 'Mi perfil',
      description: 'Información de tu perfil y ajustes de cuenta',
      onTrigger: () => navigate('/admin/profile'),
      icon: <IconDashboard size="1.2rem" />,
    },
    {
      title: 'Mis rifas',
      description: 'Información de tus rifas y sorteos',
      onTrigger: () => navigate('/admin/Coupona'),
      icon: <IconFileText size="1.2rem" />,
    },
  ])
}


export { actions }