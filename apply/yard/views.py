from django.shortcuts import render


def my_view( req ):

	#a = Artist.objects.all()

    return render( req, 'empty.html', { }  )
