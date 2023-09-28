function setActiveCrumb(breadcrumbs, name){
    for(let i=0; i<breadcrumbs.length; i++){
        if(breadcrumbs[i].title === name){
            breadcrumbs[i].disabled = false
            break;
        }
    }
    return breadcrumbs
}

function updateCrumbs(breadcrumbs, crumb){
    let found = false
    for(let i=0; i<breadcrumbs.length; i++){
        if(breadcrumbs[i].title === crumb.title){
            breadcrumbs[i].disabled = true
            breadcrumbs.length = i+1
            found = true
            break;
        }
    }
    if (!found){
        breadcrumbs.push(crumb)
    }

    return breadcrumbs
}

export {
    setActiveCrumb, updateCrumbs
}