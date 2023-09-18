using FluentValidation;
using Web2Projekat.Interfaces;
using Web2Projekat.Models;

namespace Web2Projekat.Validators
{
    public class KorisnikValidator : AbstractValidator<RegistracionaForma>
    {
        public KorisnikValidator()
        {
            RuleFor(korisnik => korisnik.Ime).NotEmpty().NotNull().WithMessage("'{PropertyName}' should be not empty.");
            RuleFor(korisnik => korisnik.Prezime).NotEmpty().NotNull().WithMessage("'{PropertyName}' should be not empty.");
            RuleFor(korisnik => korisnik.KIme).NotEmpty().NotNull().WithMessage("'{PropertyName}' should be not empty.");
            RuleFor(korisnik => korisnik.EmailAdresa).EmailAddress().WithMessage("'{PropertyName}' is invalid.");
            RuleFor(korisnik => korisnik.Lozinka).NotEmpty().NotNull().WithMessage("{PropertyName} should be not empty.").MinimumLength(8)
                .Matches("[A-Z]+").WithMessage("'{PropertyName}' must contain one or more capital letters.")
                .Matches("[a-z]+").WithMessage("'{PropertyName}' must contain one or more lowercase letters.")
                .Matches(@"(\d)+").WithMessage("'{PropertyName}' must contain one or more digits.")
                .Matches(@"[""!@$%^&*(){}:;<>,.?/+\-_=|'[\]~\\]").WithMessage("'{PropertyName}' must contain one or more special characters.");
            RuleFor(korisnik => korisnik.PotvrdaLozinka).NotEmpty().NotNull().WithMessage("'{PropertyName}' should be not empty.")
                .Equal(korisnik => korisnik.Lozinka).WithMessage("'Password' and 'Confirm Password' should match.");


        }
    }
}
