const formatDate = (date: string): string => {
    const d = new Date(date)
    return new Intl.DateTimeFormat('pt-BR').format(d)
}

export default formatDate;
