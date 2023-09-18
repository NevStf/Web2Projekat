using FluentValidation;
using Web2Projekat.Interfaces;
using Web2Projekat.Models;

namespace Web2Projekat.Validators
{
    public class IzmeniKorisnikaValidator : AbstractValidator<RegistracionaForma>
    {
        public IzmeniKorisnikaValidator()
        {
            RuleFor(korisnik => korisnik.Ime)
                   .NotEmpty().NotNull().WithMessage("'{PropertyName}' should not be empty.");

            RuleFor(korisnik => korisnik.Prezime)
                .NotEmpty().NotNull().WithMessage("'{PropertyName}' should not be empty.");


            RuleFor(korisnik => korisnik.EmailAdresa)
                .EmailAddress().WithMessage("'{PropertyName}' is invalid.");

            When(korisnik => !string.IsNullOrEmpty(korisnik.Lozinka), () =>
            {
                RuleFor(korisnik => korisnik.Lozinka)
                    .Cascade(CascadeMode.Stop) // Stop validation if password is not provided
                    .NotEmpty().NotNull().WithMessage("'{PropertyName}' should not be empty.")
                    .MinimumLength(8).WithMessage("'{PropertyName}' must be at least 8 characters.")
                    .Matches("[A-Z]+").WithMessage("'{PropertyName}' must contain at least one uppercase letter.")
                    .Matches("[a-z]+").WithMessage("'{PropertyName}' must contain at least one lowercase letter.")
                    .Matches(@"(\d)+").WithMessage("'{PropertyName}' must contain at least one digit.")
                    .Matches(@"[""!@$%^&*(){}:;<>,.?/+\-_=|'[\]~\\]").WithMessage("'{PropertyName}' must contain at least one special character.");
            });

            When(korisnik => !string.IsNullOrEmpty(korisnik.Lozinka) && !string.IsNullOrEmpty(korisnik.PotvrdaLozinka), () =>
            {
                RuleFor(korisnik => korisnik.PotvrdaLozinka)
                    .NotEmpty().NotNull().WithMessage("'{PropertyName}' should not be empty.")
                    .Equal(korisnik => korisnik.Lozinka).WithMessage("'Password' and 'Confirm Password' should match.");
            });
        }
    }
}
